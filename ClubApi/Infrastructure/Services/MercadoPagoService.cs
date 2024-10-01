using Application.Models;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using System.Threading.Tasks;

public class MercadoPagoService
{
    public MercadoPagoService()
    {
        MercadoPagoConfig.AccessToken = "YOUR_ACCESS_TOKEN";  // Configura tu token de acceso aquí
    }

    public async Task<Preference> CrearPreferenciaAsync(PaymentRequestDto request)
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
            CurrencyId = request.CurrencyId ?? "ARS", // Valor por defecto
            UnitPrice = request.Price,
        }
    },
            BackUrls = new PreferenceBackUrlsRequest
            {
                Success = request.SuccessUrl ?? "https://www.tu-sitio.com/success", // Valor por defecto si no se envía
                Failure = request.FailureUrl ?? "https://www.tu-sitio.com/failure",
                Pending = request.PendingUrl ?? "https://www.tu-sitio.com/pending",
            },
            AutoReturn = "approved"
        };

        Preference preference = await client.CreateAsync(preferenceRequest);
        return preference;
    }
}
