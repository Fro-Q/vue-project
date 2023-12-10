function foldOptionPanel() {
    const optionPanel = document.querySelector('.main-panel');
    const optionPanelBtn = document.querySelector('.main-panel-btn');
    const optionPanelBtnIcon = document.querySelector('.main-panel-btn i');
    optionPanelBtn.addEventListener('click', () => {
        optionPanel.classList.toggle('fold');
        optionPanelBtnIcon.classList.toggle('fa-angle-double-right');
        optionPanelBtnIcon.classList.toggle('fa-angle-double-left');
    });
}