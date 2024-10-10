using Application.Models;
using Application.Models.Requests;


namespace Application.Interfaces
{
    public interface IAuthenticationService
    {
        string Autenticar(AuthenticationRequest authenticationRequest);
        Task<bool> ForgotPasswordAsync(ForgotPasswordDto dto);
        Task<bool> ResetPassword(ResetPasswordDto dto);
    }
}
