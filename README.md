# AInvoker

AInvoker is a SaaS platform that provides seamless user authentication and API access to OpenAI's text generation models. It allows users to integrate AI-powered text generation into their systems without the hassle of hosting their own servers.

## Features
- **User Authentication**: Secure and easy-to-use authentication system
- **API Access**: Purchase and manage API keys for OpenAI integration
- **Scalability**: No need to maintain infrastructure—AInvoker handles it for you
- **Monitoring & Usage Tracking**: View API usage statistics in real-time

## Getting Started
### Installation
Sign up for an account at [AInvoker's website(tba)](#) and obtain an API key.

### Usage
#### Making a Request
##### Using cURL
```sh
curl -X POST "https://api.ainvoker.com/generate" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Write a short poem about the sea."}'
```

##### Using Fetch API
```javascript
fetch("https://api.ainvoker.com/generate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ prompt: "Write a short poem about the sea." })
})
  .then(response => response.json())
  .then(data => console.log(data.generated_text))
  .catch(error => console.error("Error:", error));
```

##### Using Axios
```javascript
import axios from "axios";

axios.post("https://api.ainvoker.com/generate", {
  prompt: "Write a short poem about the sea."
}, {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
})
.then(response => console.log(response.data.generated_text))
.catch(error => console.error("Error:", error));
```

#### Response
```json
{
  "generated_text": "The waves dance under the moon's soft glow..."
}
```

## API Documentation
### `POST /generate`
Generates AI-powered text based on the provided prompt.

**Request Body:**
- `prompt` (string, required): The input text to generate a response from.
- `max_tokens` (integer, optional): Limit on the number of tokens in the response.

**Response:**
- `generated_text` (string): The AI-generated response.

## Pricing
AInvoker offers flexible pricing plans based on API usage. Visit [Pricing Page(tba)](#) for details.

## Contribution Guidelines
We welcome contributions! Follow these steps to get started:

1. **Fork the Repository**: Click the fork button on GitHub and clone your fork.
2. **Create a Branch**: Use `git checkout -b feature-branch` to create a new branch.
3. **Make Changes**: Implement your feature or fix.
4. **Commit Changes**: Follow the commit conventions described above.
5. **Push to GitHub**: Use `git push origin feature-branch`.
6. **Submit a Pull Request (PR)**: Open a PR with a clear description of your changes.
## Commit Conventions
To maintain a clean and consistent commit history, follow these conventions:

### Format
```
<type>(<scope>): <message>
```

### Common Types
- **feat**: A new feature (e.g., `feat(auth): add JWT support`)
- **fix**: A bug fix (e.g., `fix(api): correct token validation`)
- **docs**: Documentation changes (e.g., `docs(readme): add commit conventions`)
- **style**: Code style updates (e.g., `style(ui): improve button padding`)
- **refactor**: Code restructuring without changing functionality (e.g., `refactor(database): optimize query handling`)
- **test**: Adding or updating tests (e.g., `test(auth): add unit tests for login`)
- **chore**: Maintenance tasks (e.g., `chore(deps): update dependencies`)

### Examples
```
feat(api): add text generation endpoint
fix(auth): resolve API key validation issue
docs(readme): update API usage examples
```

### Code of Conduct
- Be respectful and collaborative.
- Keep PRs focused and well-documented.
- Ensure tests pass before submitting PRs.

## License
MIT
