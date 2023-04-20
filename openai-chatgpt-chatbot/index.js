import colors from 'colors';
import readlineSync from 'readline-sync';
import { writeFile, appendFile } from 'fs/promises';
import openai from './config/open-ai.js';

const chatTopic = readlineSync.question(colors.bold.green(`Topic: `));
const filePath = `./saved-chats/${chatTopic
  .trim()
  .toLowerCase()
  .replaceAll(' ', '-')}.md`;

try {
  await writeFile(filePath, `# ${chatTopic}\n\n`);
} catch (err) {
  console.error(colors.red(err.message));
}

const main = async userName => {
  console.log(colors.bold.green(`Welcome to the Chatbot App!`));
  console.log(colors.bold.green(`You can start chatting with the bot...`));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow(`${userName}: `));

    chatHistory.push({
      role: 'user',
      content: userInput
    });

    try {
      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: chatHistory
      });

      const completionText = chatCompletion.data.choices[0].message.content;

      if (
        userInput.trim().toLowerCase() === 'thanks!' ||
        userInput.trim().toLowerCase() === 'ok, thanks!' ||
        userInput.trim().toLowerCase() === 'thanks, bye!' ||
        userInput.trim().toLowerCase() === 'bye!'
      ) {
        console.log(colors.green(`Chatbot: `) + completionText);

        process.exit();
      }

      console.log(colors.green(`Chatbot: `) + completionText);

      chatHistory.push({
        role: 'assistant',
        content: completionText
      });

      if (chatHistory.length > 2) {
        await appendFile(filePath, `${userName}: ${userInput}\n\n`);
        await appendFile(filePath, `Chatbot: ${completionText}\n\n`);
      }
    } catch (err) {
      console.error(colors.red(err.message));
    }
  }
};

main('Mila');
