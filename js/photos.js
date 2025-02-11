document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    // 为所有照片卡片添加点击事件
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.photo-info').textContent;
            
            modal.classList.add('show');
            // 检查图片是否正确加载
            modalImg.onerror = function() {
                console.log('模态框图片加载失败，图片路径:', this.src);
                this.onerror = null;
            };
            modalImg.src = img.src;
            modalCaption.textContent = caption;
            
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);

    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        // 恢复背景滚动
        document.body.style.overflow = '';
    }

    // 添加筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoCards = document.querySelectorAll('.photo-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选照片
            photoCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}); 