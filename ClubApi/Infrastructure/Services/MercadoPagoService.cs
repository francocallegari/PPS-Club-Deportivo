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
                    Success = request.SuccessUrl ?? "http://localhost:5173/",
                    Failure = request.FailureUrl ?? "http://localhost:5173/",
                    Pending = request.PendingUrl ?? "http://localhost:5173/",
                },
                AutoReturn = "approved"
            };

            Preference preference = await client.CreateAsync(preferenceRequest);
            // En base a la respuesta 
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
