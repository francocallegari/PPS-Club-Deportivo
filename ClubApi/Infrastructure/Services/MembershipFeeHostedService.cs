using Domain.Entities;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class MembershipFeeHostedService : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly IServiceProvider _serviceProvider;

        public MembershipFeeHostedService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // Programar la tarea para que se ejecute cada 24 horas (86400000 milisegundos)
            _timer = new Timer(GenerateFeesIfNeeded, null, TimeSpan.Zero, TimeSpan.FromMilliseconds(86400000));
            return Task.CompletedTask;
        }

        private void GenerateFeesIfNeeded(object state)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                var today = DateTime.Today;

                // Verificar si ya existe una cuota para este mes
                bool feeExists = dbContext.MembershipFees.Any(f => f.ExpirationDate.Month == today.Month && f.ExpirationDate.Year == today.Year);

                if (!feeExists)
                {
                    var lastFee = dbContext.MembershipFees.OrderByDescending(f => f.ExpirationDate).FirstOrDefault();
                    // Crear una nueva cuota para el mes
                    var newFee = new MembershipFee
                    {
                        Price = lastFee != null ? lastFee.Price : 10000, // Precio base
                        ExpirationDate = new DateTime(today.Year, today.Month, DateTime.DaysInMonth(today.Year, today.Month)) // Último día del mes
                    };

                    dbContext.MembershipFees.Add(newFee);
                    dbContext.SaveChanges();

                    // Define un porcentaje adicional por cada deporte
                    float additionalSportPercentage = 0.20f; // 20% adicional por deporte

                    var members = dbContext.Members.Include(m => m.SportsAttended).ToList();
                    foreach (var member in members)
                    {
                        float feePrice = newFee.Price;

                        // Ajustar el precio basado en el número de deportes
                        int sportCount = member.SportsAttended.Count;
                        feePrice += feePrice * additionalSportPercentage * sportCount;

                        var payment = new MembershipFeePayment
                        {
                            MemberId = member.Id,
                            Member = member,
                            FeeId = newFee.Id,
                            Fee = newFee,
                            Price = feePrice,
                            Status = FeeStatus.Pending,
                            PaymentDate = null
                        };
                        dbContext.MembershipFeePayments.Add(payment);
                    }

                    dbContext.SaveChanges();
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
