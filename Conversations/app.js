createChat();

function moveContactWrapper() {
  const contactWrapper = document.querySelector('.contacts');
  const contactImage1 = document.querySelector('.chat1');
  const contactImage2 = document.querySelector('.chat2');
  const contactImage3 = document.querySelector('.chat3');

  const contact1 = document.querySelector('.contact1');
  const contact2 = document.querySelector('.contact2');
  const contact3 = document.querySelector('.contact3');

  const chatWrapper = document.querySelector('.chat-wrapper');
  const chat1 = document.querySelector('.first');
  const chat2 = document.querySelector('.second');
  const chat3 = document.querySelector('.third');

  contactImage1.addEventListener('click', () => {
    contactWrapper.style.transform = 'translateY(170px)';
    chatWrapper.style.transform = 'translateY(603px)';
    contact1.classList.add('active');
    contact2.classList.remove('active');
    contact3.classList.remove('active');
    chat1.style.opacity = '1';
    chat2.style.opacity = '0';
    chat3.style.opacity = '0';
  });

  contactImage2.addEventListener('click', () => {
    contactWrapper.style.transform = 'translateY(-195px)';
    chatWrapper.style.transform = 'translateY(20px)';
    contact2.classList.add('active');
    contact1.classList.remove('active');
    contact3.classList.remove('active');
    chat2.style.opacity = '1';
    chat1.style.opacity = '0';
    chat3.style.opacity = '0';
  });

  contactImage3.addEventListener('click', () => {
    contactWrapper.style.transform = 'translateY(-630px)';
    chatWrapper.style.transform = 'translateY(-636px)';
    contact3.classList.add('active');
    contact2.classList.remove('active');
    contact1.classList.remove('active');
    chat3.style.opacity = '1';
    chat2.style.opacity = '0';
    chat1.style.opacity = '0';
  });
}
moveContactWrapper();

function changeChat() {
  const closeBtn = document.querySelectorAll('.contacts button');
  const chat = document.querySelector('.js-chat');

  closeBtn.forEach((button) => {
    button.addEventListener('click', () => {
      chat.style.opacity = '0';
    });
  });

  const xBtn = document.querySelectorAll('.fa-xmark');

  xBtn.forEach((xbutton) => {
    xbutton.addEventListener('click', () => {
      chat.style.opacity = '0';
    });
  });

  const contactImages = document.querySelectorAll('.contacts img');

  contactImages.forEach((image) => {
    image.addEventListener('click', () => {
      chat.style.opacity = '1';
    });
  });
}
changeChat();

function createChat() {
  let chatHTML = ``;

  let friendMessageOneHTML = [];
  let friendMessagesOne = [
    'Just the hero section?',
    'Or should I design more than that?',
    "I'd be fine with that",
  ].forEach((message, index) => {
    friendMessageOneHTML.push(`<p class="input-message friend">${message}</p>`);
  });
  let myMessageOneHTML = [];
  let myMessagesOne = [
    'Hey I am looking for a Designer for my new Webpage are you interested in designing my Herosection?',
  ].forEach((message, index) => {
    myMessageOneHTML.push(`<p class="input-message">${message}</p>`);
  });

  let friendMessageTwoHTML = [];
  let friendMessagesTwo = ['Hey!', 'Ready in 5?'].forEach((message, index) => {
    friendMessageTwoHTML.push(`<p class="input-message friend">${message}</p>`);
  });
  let myMessageTwoHTML = [];
  let myMessagesTwo = ['Hey!', 'Okay let me know'].forEach((message, index) => {
    myMessageTwoHTML.push(`<p class="input-message">${message}</p>`);
  });

  let friendMessageThreeHTML = [];
  let friendMessagesThree = [
    'Yes but',
    'What about the other two Webpages?',
    'Do I need to do these as well?',
    'Or do you do these later',
    "If so, that'd be awesome",
    'like reaaaaally awesome!',
  ].forEach((message, index) => {
    friendMessageThreeHTML.push(
      `<p class="input-message friend">${message}</p>`
    );
  });
  let myMessageThreeHTML = [];
  let myMessagesThree = ['Are you done yet?'].forEach((message, index) => {
    myMessageThreeHTML.push(`<p class="input-message">${message}</p>`);
  });

  let personalInfos = [
    {
      class: 'first',
      name: 'Sophie Nauman',
      picture:
        'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      myMessages: `${myMessageOneHTML}`,
      friendMessages: `${friendMessageOneHTML}`,
      newMessages: `${friendMessageOneHTML.length}`,
    },
    {
      class: 'second',
      name: 'Estelle Warner',
      picture:
        'https://images.unsplash.com/photo-1664575603992-0f17b771dd91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      myMessages: `${myMessageTwoHTML}`,
      friendMessages: `${friendMessageTwoHTML}`,
      newMessages: `${friendMessageTwoHTML.length}`,
    },
    {
      class: 'third',
      name: 'Maurice Richard',
      picture:
        'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      myMessages: `${myMessageThreeHTML}`,
      friendMessages: `${friendMessageThreeHTML}`,
      newMessages: `${friendMessageThreeHTML.length}`,
    },
  ];

  personalInfos.forEach((info, index) => {
    const html = `
    <div class="chat js-chat ${personalInfos[index].class}">
    <nav>
      <img
        src = ${personalInfos[index].picture}
        alt="" />
      <h2 class="name">${personalInfos[index].name}</h2>
      <i class="fa-solid fa-xmark"></i>
    </nav>
    <main>
      <div class="message">
        <p class="message-infos">
          <span class="name">You </span><span class="time">13:32</span>
        </p>
        <p class="input-message">${personalInfos[index].myMessages}</p>
      </div>
      <div class="new-messages">
        <p>${personalInfos[index].newMessages} new messages</p>
      </div>
      <div class="friend-message">
        <p class="message-infos">
          <span class="friend-name name">${personalInfos[index].name}</span>
          <span class="time">14:04</span>
        </p>
        <p class="input-message friend">${personalInfos[index].friendMessages}</p>
      </div>
    </main>
    <div class="type-message">
      <i class="fa-regular fa-image"></i>
      <i class="fa-solid fa-camera"></i>
      <i class="fa-solid fa-microphone"></i>
      <input
        type="message"
        placeholder="Type your message here" />
      <button class="send">Send</button>
    </div>
  </div>
   `;
    chatHTML += html;
  });
  document.querySelector('.chat-wrapper').innerHTML = chatHTML;
}
