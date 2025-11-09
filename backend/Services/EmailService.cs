using backend.DTOs;  // Pour DTOs si besoin (optionnel)
using SendGrid;  // Pour SendGridClient
using SendGrid.Helpers.Mail;  // Pour EmailAddress, MailHelper
using Microsoft.Extensions.Configuration;  // ← AJOUT : Pour IConfiguration
using System;  // ← AJOUT : Pour Exception

namespace backend.Services  // ← Vérifiez que le namespace est bien ça
{
    public class EmailService  // ← public valide ici
    {
        private readonly IConfiguration _configuration;  // ← AJOUT : Champ privé pour DI

        public EmailService(IConfiguration configuration)  // ← Constructeur DI
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));  // ← Null check
        }

        public async Task SendResetPasswordEmail(string email, string resetToken)  // ← Async Task, pas object
        {
            var apiKey = _configuration["SendGrid:ApiKey"];  // ← Utilise le champ
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Clé API SendGrid manquante dans appsettings.json");
            }

            // Code SendGrid existant
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(_configuration["SendGrid:FromEmail"], _configuration["SendGrid:FromName"]);
            var to = new EmailAddress(email);
            var msg = MailHelper.CreateSingleEmail(from, to, "Réinitialisation Mot de Passe",
                $"Cliquez pour réinitialiser : https://ton-app-mobile.com/reset-password?token={resetToken}",
                $"Si le lien ne fonctionne pas, copiez : https://ton-app-mobile.com/reset-password?token={resetToken}");

            var response = await client.SendEmailAsync(msg);  // ← Await pour async
            if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
                throw new Exception($"Erreur envoi email : {response.StatusCode}");
        }
    }
}