# 🤖 WhatsApp Bot Automation (Node.js)

Bot WhatsApp otomatis berbasis **Node.js** untuk menangani respon pesan interaktif. Mengintegrasikan **WhatsApp API** dengan backend logic untuk automation workflow yang scalable dan production-ready.

## ✨ Features

✅ **Auto-reply System**: Instant message responses  
✅ **Interactive Menus**: Button-based navigation  
✅ **Command Handling**: Prefix-based commands  
✅ **Database Integration**: Persist user data & conversation history  
✅ **Scheduled Messages**: Automated notifications  
✅ **Multi-user Support**: Handle multiple chats simultaneously  
✅ **Media Handling**: Send images, documents, media  
✅ **Error Handling**: Robust error management & logging  
✅ **Webhook Integration**: Receive messages from WhatsApp Cloud API  

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js 16+ |
| **Framework** | Express.js |
| **WhatsApp API** | Twilio / WhatsApp Cloud API |
| **Database** | MongoDB / MySQL |
| **Task Queue** | Bull / RabbitMQ (optional) |
| **Hosting** | Heroku / Railway / AWS Lambda |

## 📋 Prerequisites

- Node.js 16+ & npm
- WhatsApp Business Account
- Twilio/WhatsApp Cloud API account
- Git
- (Optional) MongoDB for user data

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/MuhammadAmirN/botWA.git
cd botWA
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Update `.env` dengan credentials:
```env
# WhatsApp Configuration
WHATSAPP_API_KEY=your_api_key
WHATSAPP_PHONE_ID=your_phone_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# Server Configuration
PORT=3000
NODE_ENV=development

# Database (if using MongoDB)
MONGODB_URI=mongodb://localhost:27017/botwa
MONGODB_USER=admin
MONGODB_PASSWORD=password

# Webhook Security
WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# Optional: SMS Notifications
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 4. Start Bot
```bash
npm start
# or development mode:
npm run dev
```

## 📡 API Integration Setup

### WhatsApp Cloud API
1. Create Meta Business Account
2. Create WhatsApp Business Account
3. Generate API key
4. Register webhook URL: `https://your-domain.com/webhook`
5. Set webhook verify token

### Webhook Configuration
```javascript
// Webhook receives messages here
app.post('/webhook', (req, res) => {
    const body = req.body;
    
    if (body.object === 'whatsapp_business_account') {
        // Process messages
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
```

## 💬 Available Commands

```
/start      - Initialize bot & get menu
/help       - Show all available commands
/status     - Check bot status
/menu       - Display main menu
/info       - Get information
/support    - Customer support menu
/broadcast  - Admin: Send bulk messages
```

## 📊 Message Flow Architecture

```
User Message
    ↓
Webhook Listener (receive)
    ↓
Message Parser (extract content, sender, type)
    ↓
Intent Recognition (understand user intent)
    ↓
Command Router (route to handler)
    ↓
Handler Processing (business logic)
    ↓
Database Query/Update (if needed)
    ↓
Response Generator (create reply)
    ↓
WhatsApp API Send (send via API)
    ↓
Logging & Analytics
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
    _id: ObjectId,
    phone_number: "+62821...",
    name: "Customer Name",
    status: "active/inactive",
    last_interaction: ISODate,
    conversation_count: 5,
    created_at: ISODate
}
```

### Messages Collection
```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    message_id: "wamid.xxx",
    content: "Message text",
    type: "text/image/document",
    direction: "incoming/outgoing",
    timestamp: ISODate,
    status: "sent/delivered/read"
}
```

### Sessions Collection
```javascript
{
    _id: ObjectId,
    user_id: ObjectId,
    session_state: "menu/waiting_input",
    context: { /* custom data */ },
    expires_at: ISODate
}
```

## 🎯 Key Features in Detail

### 1. Auto-reply System
```javascript
// Trigger on incoming message
bot.on('message', async (msg) => {
    // Respond to keywords
    if (msg.text.includes('hello') || msg.text.includes('halo')) {
        await msg.reply('Halo! Ada yang bisa dibantu?');
    }
});
```

### 2. Interactive Buttons
```javascript
// Send menu with buttons
await sendButtonMessage(chatId, {
    header: 'Pilih Layanan',
    body: 'Pilih salah satu layanan:',
    buttons: [
        { id: '1', title: 'Booking' },
        { id: '2', title: 'Info' },
        { id: '3', title: 'Support' }
    ]
});
```

### 3. Template Messages
```javascript
// Send structured message template
await sendTemplateMessage(chatId, {
    name: 'booking_confirmation',
    language: 'id',
    parameters: {
        body: {
            type: 'body',
            parameters: [
                { type: 'text', text: 'Order #123' },
                { type: 'text', text: 'Rp 50,000' }
            ]
        }
    }
});
```

### 4. Media Messages
```javascript
// Send image
await sendImageMessage(chatId, {
    link: 'https://example.com/image.jpg',
    caption: 'Product image'
});

// Send document
await sendDocumentMessage(chatId, {
    link: 'https://example.com/invoice.pdf',
    caption: 'Invoice #123'
});
```

### 5. Scheduled Messages
```javascript
// Schedule message for future time
schedule.scheduleJob('0 9 * * *', async () => {
    await broadcastMessage(allUsers, 'Good morning! 🌅');
});
```

## 📁 Project Structure

```
botWA/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── whatsapp.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── messageController.js
│   │   ├── webhookController.js
│   │   └── commandController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   └── Session.js
│   ├── services/
│   │   ├── whatsappService.js
│   │   ├── messageService.js
│   │   ├── userService.js
│   │   └── analyticsService.js
│   ├── handlers/
│   │   ├── commandHandler.js
│   │   ├── menuHandler.js
│   │   ├── bookingHandler.js
│   │   └── supportHandler.js
│   ├── middleware/
│   │   ├── webhookValidator.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── helpers.js
│   │   └── validators.js
│   └── index.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── mocks/
├── docs/
│   ├── setup.md
│   ├── commands.md
│   └── api.md
├── .env.example
├── package.json
└── README.md
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

### Example Test
```javascript
describe('Message Handler', () => {
    test('should respond to /start command', async () => {
        const message = '/start';
        const response = await handleMessage(message);
        
        expect(response).toBeDefined();
        expect(response.type).toBe('menu');
    });
});
```

## 🚀 Deployment

### Heroku Deployment
```bash
heroku login
heroku create your-bot-name
git push heroku main

# Set environment variables
heroku config:set WHATSAPP_API_KEY=xxx
heroku config:set WHATSAPP_PHONE_ID=xxx

# View logs
heroku logs --tail
```

### Railway Deployment
```bash
railway login
railway init
railway up

# Setup environment in Railway dashboard
```

### AWS Lambda (Serverless)
```bash
npm install -g serverless
serverless deploy
```

## 📊 Monitoring & Analytics

### Metrics to Track
```
- Messages per day
- Response time
- User retention rate
- Command usage statistics
- Error rate
- Conversation success rate
```

### Logging
```javascript
// All important events logged
logger.info('Bot started');
logger.info(`Message received: ${msg.id}`);
logger.error('API error:', error);
```

## 🔒 Security Features

- Webhook signature verification
- Input validation & sanitization
- Rate limiting
- Error message obfuscation
- Secure credential management (dotenv)
- HTTPS only

## 🐛 Troubleshooting

### Bot not receiving messages?
- Verify webhook URL in WhatsApp settings
- Check webhook verify token matches
- Monitor logs for errors
- Test webhook with curl:
```bash
curl -X GET "https://your-domain.com/webhook?hub.verify_token=YOUR_TOKEN&hub.challenge=CHALLENGE"
```

### API Errors
- Check credentials in .env
- Verify API rate limits
- Check WhatsApp Business Account status
- Review API documentation

### Database Connection Issues
- Verify MongoDB/MySQL running
- Check connection string in .env
- Test connection manually

## 📈 Performance Optimization

- Message queue for high volume
- Caching frequently accessed data
- Connection pooling for database
- CDN for media files
- Optimize API calls

## 📚 Resources

- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp)
- [Express.js Guide](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🎯 Future Enhancements

- [ ] AI-powered intent recognition
- [ ] Natural Language Processing
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with CRM systems
- [ ] Payment gateway integration
- [ ] Broadcast campaign management
- [ ] Template management UI

## 📞 Support

Issues or questions?
- GitHub Issues: https://github.com/MuhammadAmirN/botWA/issues
- Email: muhamir6n@gmail.com
- Documentation: See /docs folder

## 👤 Author

**Muhammad Amir Nurudin**
- GitHub: [@MuhammadAmirN](https://github.com/MuhammadAmirN)
- Email: muhamir6n@gmail.com
- LinkedIn: [muh-amir-n](https://linkedin.com/in/muh-amir-n-a1a94b418/)

## 📄 License

MIT License - See LICENSE file for details
