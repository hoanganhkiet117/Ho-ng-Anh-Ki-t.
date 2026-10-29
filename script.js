const $ = (id) => document.getElementById(id);
$('year').textContent = new Date().getFullYear();

const menuToggle = $('menuToggle');
const navLinks = $('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

let draftText = '';
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.choose-service').forEach(button => {
  button.addEventListener('click', () => {
    $('platform').value = button.dataset.platform;
    $('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`Đã chọn nền tảng ${button.dataset.platform}. Hãy điền form để tạo bản nháp.`);
  });
});

$('orderForm').addEventListener('submit', event => {
  event.preventDefault();
  const platform = $('platform').value;
  const service = $('service').value;
  const url = $('url').value.trim();
  const quantity = $('quantity').value;
  const contact = $('contactInfo').value.trim() || 'Chưa cung cấp';
  const note = $('note').value.trim() || 'Không có';
  draftText = [
    'YÊU CẦU DỊCH VỤ — HOÀNG ANH KIỆT',
    'Trạng thái: Bản nháp trên thiết bị, chưa gửi',
    `Nền tảng: ${platform}`,
    `Dịch vụ: ${service}`,
    `Liên kết: ${url}`,
    `Số lượng / phạm vi: ${quantity}`,
    `Liên hệ: ${contact}`,
    `Ghi chú: ${note}`
  ].join('\n');
  $('resultBox').hidden = false;
  $('resultBox').textContent = draftText;
  showToast('Đã tạo bản nháp. Chưa có dữ liệu nào được gửi đi.');
  $('resultBox').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

$('copyBtn').addEventListener('click', async () => {
  if (!draftText) {
    showToast('Hãy tạo bản nháp trước khi sao chép.');
    return;
  }
  try {
    await navigator.clipboard.writeText(draftText);
    showToast('Đã sao chép nội dung yêu cầu.');
  } catch (error) {
    const area = document.createElement('textarea');
    area.value = draftText;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    showToast(copied ? 'Đã sao chép nội dung yêu cầu.' : 'Không sao chép được; hãy chọn nội dung thủ công.');
  }
});
