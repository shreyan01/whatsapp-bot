import { div } from "framer-motion/client";
import WhatsAppBotForm from "../components/send-text";

export default function SendText() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
        <WhatsAppBotForm />
    </div>
  )
}
