import { NextResponse } from 'next/server';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

export async function POST(request: Request) {
    const { orderId, customerName, customerPhone } = await request.json();

    if (!orderId || !customerName || !customerPhone) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        // Note: This endpoint is kept for compatibility but WhatsApp notifications
        // are now sent directly from the orders route
        return NextResponse.json({ message: 'Notification endpoint - use orders route instead' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }
}