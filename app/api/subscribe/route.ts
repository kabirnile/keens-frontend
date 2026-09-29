
import { NextResponse } from 'next/server';



export async function POST(req: Request) {

  try {

    return NextResponse.json({ success: true, message: 'Subscription saved.' });

  } catch (error) {

    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });

  }

}

