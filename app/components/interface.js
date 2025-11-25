import Component from '@glimmer/component';
import { action } from '@ember/object';
import BrowserID from '../utility/BrowserID';

export default class Interface extends Component {

  @action async init(){
    const device_browser_id =await BrowserID()
    console.log(device_browser_id);
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
    });

    mobileOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      mobileOverlay.classList.remove('active');
    });

    // Auto-resize textarea
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message functionality
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messagesContainer');

    function sendMessage() {
      const text = messageInput.value.trim();
      if (text) {
        const time = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        const messageHTML = `
                    <div class="message user">
                        <div class="message-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-text">${text}</div>
                            <div class="message-time">${time}</div>
                        </div>
                    </div>
                `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messageInput.value = '';
        messageInput.style.height = 'auto';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Chat history click handlers
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
      item.addEventListener('click', function() {
        chatItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          mobileOverlay.classList.remove('active');
        }
      });
    });
  }
}
