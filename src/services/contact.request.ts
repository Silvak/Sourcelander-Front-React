import axios from "axios";

export const sendMail = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  companyName: string;
  phoneNumber?: string;
  reason: string;
  message: string;
}) => {
  // Armo el HTML del correo
  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phoneNumber || "No especificado"}</p>
    <p><strong>Puesto:</strong> ${data.jobTitle}</p>
    <p><strong>Empresa:</strong> ${data.companyName}</p>
    <p><strong>Motivo:</strong> ${data.reason}</p>
    <hr/>
    <p><strong>Mensaje:</strong><br/>${data.message}</p>
  `;

  const form = new FormData();
  form.append("to", data.email);
  form.append("subject", `Nuevo mensaje de ${data.firstName}`);
  form.append("html", html);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/emails/send`,
    form,
  );

  return res.data;
};
