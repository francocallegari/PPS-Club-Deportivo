using Application.Models;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

public class MercadoPagoService
{
    public MercadoPagoService(IConfiguration configuration)
    {
        MercadoPagoConfig.AccessToken = configuration["MercadoPago:AccessToken"];

    }

    public async Task<Preference> CrearPreferenciaAsync(PaymentRequestDto request)
    {
        try
        {
            var client = new PreferenceClient();
            var preferenceRequest = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
            {
                new PreferenceItemRequest
                {
                    Title = request.Title,
                    Quantity = request.Quantity,
                    CurrencyId = request.CurrencyId ?? "ARS",
                    UnitPrice = request.Price,
                }
            },
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = request.SuccessUrl ?? "http://google.com/",
                    Failure = request.FailureUrl ?? "http://google.com/",
                    Pending = request.PendingUrl ?? "http://google.com/",
                },
                AutoReturn = "approved"
            };

            Preference preference = await client.CreateAsync(preferenceRequest);
            return preference;
        }
        catch (Exception ex)
        {
            // Manejo de errores (puedes loguear el error o devolver un mensaje de error)
            Console.WriteLine($"Error creando la preferencia: {ex.Message}");
            return null;
        }
    }

}
