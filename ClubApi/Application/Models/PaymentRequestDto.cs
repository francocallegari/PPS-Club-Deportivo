using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PaymentRequestDto
    {
        public string Title { get; set; } 
        public int Quantity { get; set; } 
        public decimal Price { get; set; } 
        public string CurrencyId { get; set; } 

        // Opcional: URLs de redirección después del pago
        public string SuccessUrl { get; set; } 
        public string FailureUrl { get; set; } 
        public string PendingUrl { get; set; }
    }

}
