import { CartItem, CheckoutDetails } from "@/types/menu";
import { RESTAURANT_INFO } from "@/data/restaurant";
import { formatCurrency } from "./currency";

export function generateWhatsAppMessage(
  items: CartItem[],
  checkout: CheckoutDetails,
  subtotal: number
): string {
  const serviceLabels: Record<string, string> = {
    delivery: "Home Delivery 🛵",
    takeaway: "Takeaway / Pickup 🛍️",
    dinein: "Dine-in Order / Inquiry 🍽️",
  };

  const lines: string[] = [
    `*--- KRISPY FOOD ORDER ---*`,
    `*Customer:* ${checkout.name}`,
    `*Phone:* ${checkout.phone}`,
    `*Order Type:* ${serviceLabels[checkout.serviceType] || checkout.serviceType}`,
  ];

  if (checkout.serviceType === "delivery" && checkout.address) {
    lines.push(`*Delivery Address:* ${checkout.address}`);
  }

  lines.push("");
  lines.push(`*--- ORDERED ITEMS ---*`);

  items.forEach((item, index) => {
    const sizeStr = item.sizeLabel ? ` (${item.sizeLabel})` : "";
    const extrasStr =
      item.selectedExtras && item.selectedExtras.length > 0
        ? `\n   + Extras: ${item.selectedExtras.map((e) => `${e.name} (+${formatCurrency(e.price)})`).join(", ")}`
        : "";
    const instructionsStr = item.specialInstructions
      ? `\n   Note: ${item.specialInstructions}`
      : "";

    lines.push(
      `${index + 1}. *${item.menuItem.name}*${sizeStr} x ${item.quantity} = ${formatCurrency(
        item.unitPrice * item.quantity
      )}${extrasStr}${instructionsStr}`
    );
  });

  lines.push("");
  lines.push(`*Subtotal:* ${formatCurrency(subtotal)}`);
  lines.push(`*Delivery Charges:* Confirmed by restaurant`);

  if (checkout.notes) {
    lines.push("");
    lines.push(`*Special Instructions:* ${checkout.notes}`);
  }

  lines.push("");
  lines.push(`_Sent via Krispy Online Menu Demo (Vehari)_`);

  return lines.join("\n");
}

export function createWhatsAppOrderUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}?text=${encoded}`;
}

