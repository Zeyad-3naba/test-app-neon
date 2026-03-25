const { neon } = require('@neondatabase/serverless');

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS test_messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Insert a test message
    const result = await sql`
      INSERT INTO test_messages (message)
      VALUES ('Hello from Neon DB!')
      RETURNING id, message, created_at
    `;
    
    // Get all messages
    const messages = await sql`SELECT * FROM test_messages ORDER BY created_at DESC`;
    
    res.status(200).json({
      success: true,
      message: 'Connected to Neon DB!',
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}