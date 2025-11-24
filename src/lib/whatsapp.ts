import { Order } from '@/types/order';

/**
 * Send WhatsApp notification to restaurant using WhatsApp Cloud API
 */
export async function sendWhatsAppNotification(order: Order): Promise<boolean> {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, RESTAURANT_WHATSAPP } = process.env;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !RESTAURANT_WHATSAPP) {
    console.error('Missing WhatsApp environment variables');
    return false;
  }

  // Format the order message
  const orderTypeText = order.order_type === 'delivery' ? 'DELIVERY' : 'PICKUP';
  const itemsList = order.items
    .map((item) => `- ${item.quantity} x ${item.name} (€${item.unit_price.toFixed(2)})`)
    .join('\n');

  let messageBody = `🍽️ New order for Apna Punjab pizza kebap\n\n`;
  messageBody += `Type: ${orderTypeText}\n`;
  messageBody += `Customer: ${order.customer_name}\n`;
  messageBody += `Phone: ${order.phone}\n`;

  if (order.order_type === 'delivery' && order.address) {
    messageBody += `Address: ${order.address}\n`;
  }

  if (order.location_description) {
    messageBody += `Notes: ${order.location_description}\n`;
  }

  messageBody += `\nItems:\n${itemsList}\n`;
  messageBody += `\nTotal: €${order.total_price.toFixed(2)}`;

  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: RESTAURANT_WHATSAPP,
        type: 'text',
        text: {
          body: messageBody,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('WhatsApp notification sent:', result);
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
}
