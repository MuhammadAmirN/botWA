import makeWaSocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWaSocket({
    version,
    auth: state,
    printQRInTerminal: false // karena pake qrcode-terminal sendiri
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    console.log("connection.update", update);

    if (update.qr) {
      qrcode.generate(update.qr, { small: true });
      console.log("QR code ready, scan with WhatsApp");
    }

    if (update.connection === "open") {
      console.log("Bot connected ✅");
    }

    if (update.connection === "close") {
      console.log("connection closed", update.lastDisconnect?.error);
      setTimeout(startBot, 5000);
    }
  });
}

startBot();
