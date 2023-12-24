import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main(){
    /*
    const userName = readlineSync.question('What is your name? ');
    console.log(`Hello ${userName}`)
    */
   console.log(colors.bold.green('Welcome to GeoNewsFinder! '));
   console.log(colors.bold.green('You can start chatting with the bot. '));

   const chatHistory = []; //Store Convo history


   while(true){
       const userInput = readlineSync.question(colors.yellow('You: '));

       try{
           const messages = chatHistory.map(([role, content]) => ({role, content}))

           messages.push({role: 'user', content: userInput});

           // call API with user input
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            // Get completion text/content
            const completionText = chatCompletion.choices[0].message.content;


           if(userInput.toLowerCase() === 'exit'){
               console.log(colors.green('Bot: ') + completionText);
               return;
           }

           console.log(colors.green('Bot: ') + completionText);

           // update history with user input and assistant response
           chatHistory.push(['user', userInput]);
           chatHistory.push(['assistant', completionText]);


       }catch(error){
           console.error(colors.red(error));
       }
   }

    






    /*
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "What is the capital of California?"}],
      });
    console.log(chatCompletion.choices[0].message.content);
    */

}

main();