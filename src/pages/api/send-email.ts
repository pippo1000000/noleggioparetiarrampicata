import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, message, subject = 'Nuovo messaggio dal sito' } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Campi obbligatori mancanti.' }),
        { status: 400 }
      );
    }

    const API_KEY = import.meta.env.ELASTIC_EMAIL_API_KEY;
    const RECIPIENT = import.meta.env.CONTACT_RECIPIENT_EMAIL;

    if (!API_KEY || !RECIPIENT) {
      console.error('Configurazione email mancante in .env');
      return new Response(
        JSON.stringify({ message: 'Errore di configurazione del server.' }),
        { status: 500 }
      );
    }

    const emailBody = `
      <h2>Nuova richiesta di contatto</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const response = await fetch('https://api.elasticemail.com/v4/emails/transactional', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': API_KEY,
      },
      body: JSON.stringify({
        Recipients: {
          To: [RECIPIENT],
        },
        Content: {
          Body: [
            {
              ContentType: 'HTML',
              Content: emailBody,
              Charset: 'utf-8',
            },
          ],
          From: RECIPIENT, // Using the company email as sender for verification compatibility
          ReplyTo: email,    // User's email for replies
          Subject: `${subject}: ${name}`,
        },
      }),
    });

    if (response.ok) {
      return new Response(
        JSON.stringify({ message: 'Email inviata con successo!' }),
        { status: 200 }
      );
    } else {
      const errorText = await response.text();
      console.error('Errore Elastic Email Status:', response.status);
      console.error('Errore Elastic Email Body:', errorText);
      return new Response(
        JSON.stringify({ message: "Impossibile inviare l'email. Errore del fornitore.", details: errorText }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Errore API send-email:', error);
    return new Response(
      JSON.stringify({ message: 'Errore interno del server.', error: String(error) }),
      { status: 500 }
    );
  }
};
