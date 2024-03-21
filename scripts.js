const cifraDeCesarDecode = (decoded_text) => {
  const shift = 3;

  return decoded_text
    .split("")
    .map(function (char) {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const offset = char.toUpperCase() === char ? 65 : 97;
        return String.fromCharCode(
          ((code - offset - shift + 26) % 26) + offset
        );
      } else {
        return char;
      }
    })
    .join("");
};

const cifraDeCesarEncoder = (encoded_text) => {
  const shift = 3;

  return encoded_text
    .split("")
    .map(function (char) {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const offset = char.toUpperCase() === char ? 65 : 97;
        return String.fromCharCode(((code - offset + shift) % 26) + offset);
      } else {
        return char;
      }
    })
    .join("");
};

const decodeText = () => {
  const encoded_text_area = document.getElementById("TextEncoder");
  const decoded_text_area = document.getElementById("TextDecodedReadonly");
  const encoded_text = encoded_text_area.value;
  const decoded_text = cifraDeCesarDecode(encoded_text);
  decoded_text_area.value = decoded_text;
};

const encodeText = () => {
  const decoded_text_area = document.getElementById("TextDecoder");
  const encoded_text_area = document.getElementById("TextEncodedReadonly");
  const decoded_text = decoded_text_area.value;
  const encoded_text = cifraDeCesarEncoder(decoded_text);
  encoded_text_area.value = encoded_text;
};


const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#0F0';
  context.font = fontSize + 'px monospace';

  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

setInterval(draw, 30);