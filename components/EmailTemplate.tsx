// components/EmailTemplate.tsx
import * as React from "react";

type EmailTemplateProps  = {
  name: string;
  email: string;
  message: string;
};

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", lineHeight: 1.6 }}>
      <h2 style={{ margin: "0 0 8px" }}>Nuevo mensaje del portafolio</h2>
      <p style={{ margin: "0 0 8px" }}>
        <strong>Nombre:</strong> {name}
      </p>
      <p style={{ margin: "0 0 8px" }}>
        <strong>Email:</strong> {email}
      </p>
      <hr style={{ margin: "16px 0" }} />
      <div>
        {message.split("\n").map((line, i) => (
          <p key={i} style={{ margin: "0 0 8px" }}>{line}</p>
        ))}
      </div>
    </div>
  );
}
