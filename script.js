document.addEventListener('DOMContentLoaded', function() {
    // 選單切換功能
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 平滑滾動功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 如果選單是開啟的，點擊後關閉它
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // 表單提交事件
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單數據
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('formMessage');
            
            // 簡單的前端驗證
            if (!name || !email || !message) {
                formMessage.textContent = '請填寫所有必填欄位';
                formMessage.className = 'form-message error';
                return;
            }
            
            // 使用mailto協議開啟郵件客戶端
            const mailtoLink = `mailto:chengx740613@gmail.com?subject=壁球世界網站聯絡表單&body=姓名: ${encodeURIComponent(name)}%0A電子郵件: ${encodeURIComponent(email)}%0A電話: ${encodeURIComponent(phone || '未提供')}%0A訊息: %0A${encodeURIComponent(message)}`;
            
            // 嘗試開啟郵件客戶端
            try {
                window.location.href = mailtoLink;
                
                // 顯示成功訊息
                formMessage.textContent = '感謝您的訊息！您的郵件客戶端已開啟，請確認並發送郵件。';
                formMessage.className = 'form-message success';
                
                // 重置表單
                this.reset();
            } catch (error) {
                // 如果開啟郵件客戶端失敗
                formMessage.textContent = '無法開啟郵件客戶端，請直接發送郵件至 chengx740613@gmail.com';
                formMessage.className = 'form-message error';
                console.error('無法開啟郵件客戶端:', error);
            }
        });
    }
});