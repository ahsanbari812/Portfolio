import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

const BUTTON_COLORS = [
  { name: 'Purple', value: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'Pink', value: 'bg-pink-500 hover:bg-pink-600' },
  { name: 'Orange', value: 'bg-orange-500 hover:bg-orange-600' },
  { name: 'Gray', value: 'bg-zinc-700 hover:bg-zinc-800' },
];
const BUTTON_SIZES = [
  { name: 'Small', value: 'px-4 py-2 text-sm' },
  { name: 'Medium', value: 'px-6 py-3 text-base' },
  { name: 'Large', value: 'px-8 py-4 text-lg' },
];

const CARD_COLORS = [
  { name: 'Dark', value: 'bg-gradient-to-br from-zinc-900/90 to-zinc-800/90' },
  { name: 'Purple', value: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' },
  { name: 'Glass', value: 'bg-zinc-900/60 backdrop-blur-sm' },
];

const MODAL_COLORS = [
  { name: 'Dark', value: 'bg-zinc-900/95' },
  { name: 'Glass', value: 'bg-zinc-900/80 backdrop-blur-md' },
];

function generateButtonCode({ label, color, size, rounded, shadow }: any) {
  return `<button
  className="${color} ${size}${rounded ? ' rounded-full' : ' rounded-md'}${shadow ? ' shadow-lg' : ''} font-semibold transition-colors duration-200 focus:outline-none"
>
  ${label}
</button>`;
}

function generateCardCode({ title, content, color, shadow, rounded }: any) {
  return `<div className="${color}${shadow ? ' shadow-xl' : ''}${rounded ? ' rounded-2xl' : ' rounded-lg'} border border-zinc-700/50 p-6 max-w-sm mx-auto">
  <h3 className="text-xl font-bold mb-2">${title}</h3>
  <p className="text-gray-400">${content}</p>
</div>`;
}

function generateModalCode({ title, content, color, rounded }: any) {
  return `<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
  <div className="relative ${color}${rounded ? ' rounded-2xl' : ' rounded-lg'} border border-zinc-700/50 p-8 max-w-md w-full z-10">
    <h3 className="text-2xl font-bold mb-4">${title}</h3>
    <p className="text-gray-300">${content}</p>
    <button className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">Close</button>
  </div>
</div>`;
}

const COMPONENTS = [
  { name: 'Button', value: 'button' },
  { name: 'Card', value: 'card' },
  { name: 'Modal', value: 'modal' },
];

const Playground: React.FC = () => {
  // General
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [darkMode] = useState(true);

  // Button state
  const [btnLabel, setBtnLabel] = useState('Click Me');
  const [btnColor, setBtnColor] = useState(BUTTON_COLORS[0].value);
  const [btnSize, setBtnSize] = useState(BUTTON_SIZES[1].value);
  const [btnRounded, setBtnRounded] = useState(true);
  const [btnShadow, setBtnShadow] = useState(true);

  // Card state
  const [cardTitle, setCardTitle] = useState('Card Title');
  const [cardContent, setCardContent] = useState('This is a beautiful card.');
  const [cardColor, setCardColor] = useState(CARD_COLORS[0].value);
  const [cardShadow, setCardShadow] = useState(true);
  const [cardRounded, setCardRounded] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Modal Title');
  const [modalContent, setModalContent] = useState('This is a modal dialog.');
  const [modalColor, setModalColor] = useState(MODAL_COLORS[0].value);
  const [modalRounded, setModalRounded] = useState(true);

  // Code state
  const getCode = () => {
    if (selectedComponent === 'button') {
      return generateButtonCode({ label: btnLabel, color: btnColor, size: btnSize, rounded: btnRounded, shadow: btnShadow });
    } else if (selectedComponent === 'card') {
      return generateCardCode({ title: cardTitle, content: cardContent, color: cardColor, shadow: cardShadow, rounded: cardRounded });
    } else if (selectedComponent === 'modal') {
      return generateModalCode({ title: modalTitle, content: modalContent, color: modalColor, rounded: modalRounded });
    }
    return '';
  };
  const [code, setCode] = useState(getCode());

  React.useEffect(() => {
    setCode(getCode());
    // eslint-disable-next-line
  }, [selectedComponent, btnLabel, btnColor, btnSize, btnRounded, btnShadow, cardTitle, cardContent, cardColor, cardShadow, cardRounded, modalTitle, modalContent, modalColor, modalRounded]);

  const onCodeChange = useCallback((val: string) => {
    setCode(val);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  // --- UI ---
  return (
    <div className={`min-h-screen flex flex-col items-center justify-start w-full px-4 py-10 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="flex items-center justify-between w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Live UI Playground</h1>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-6 p-6 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 shadow-xl backdrop-blur-lg">
          <div className="mb-2">
            <label className="block text-lg font-bold mb-2 tracking-wide">Component</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm"
              value={selectedComponent}
              onChange={e => setSelectedComponent(e.target.value)}
            >
              {COMPONENTS.map(c => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>
          <AnimatePresence>
            {selectedComponent === 'button' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Label</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm"
                    value={btnLabel}
                    onChange={e => setBtnLabel(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Color</label>
                  <div className="flex gap-3">
                    {BUTTON_COLORS.map((c) => (
                      <button
                        key={c.value}
                        className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 shadow-sm text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${btnColor === c.value ? 'border-pink-500 ring-2 ring-pink-500 scale-105' : 'border-zinc-700 hover:border-pink-400 hover:scale-105'} ${c.value}`}
                        onClick={() => setBtnColor(c.value)}
                        type="button"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Size</label>
                  <div className="flex gap-3">
                    {BUTTON_SIZES.map((s) => (
                      <button
                        key={s.value}
                        className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 shadow-sm text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${btnSize === s.value ? 'border-pink-500 ring-2 ring-pink-500 scale-105' : 'border-zinc-700 hover:border-pink-400 hover:scale-105'} bg-zinc-900/80`}
                        onClick={() => setBtnSize(s.value)}
                        type="button"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <label className="font-bold text-base flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={btnRounded} onChange={e => setBtnRounded(e.target.checked)} className="accent-pink-500 w-5 h-5 rounded focus:ring-2 focus:ring-pink-500" />
                    Rounded
                  </label>
                  <label className="font-bold text-base flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={btnShadow} onChange={e => setBtnShadow(e.target.checked)} className="accent-pink-500 w-5 h-5 rounded focus:ring-2 focus:ring-pink-500" />
                    Shadow
                  </label>
                </div>
              </motion.div>
            )}
            {selectedComponent === 'card' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Title</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm"
                    value={cardTitle}
                    onChange={e => setCardTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Content</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm min-h-[80px]"
                    value={cardContent}
                    onChange={e => setCardContent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Color</label>
                  <div className="flex gap-3">
                    {CARD_COLORS.map((c) => (
                      <button
                        key={c.value}
                        className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 shadow-sm text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${cardColor === c.value ? 'border-pink-500 ring-2 ring-pink-500 scale-105' : 'border-zinc-700 hover:border-pink-400 hover:scale-105'} ${c.value}`}
                        onClick={() => setCardColor(c.value)}
                        type="button"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <label className="font-bold text-base flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={cardRounded} onChange={e => setCardRounded(e.target.checked)} className="accent-pink-500 w-5 h-5 rounded focus:ring-2 focus:ring-pink-500" />
                    Rounded
                  </label>
                  <label className="font-bold text-base flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={cardShadow} onChange={e => setCardShadow(e.target.checked)} className="accent-pink-500 w-5 h-5 rounded focus:ring-2 focus:ring-pink-500" />
                    Shadow
                  </label>
                </div>
              </motion.div>
            )}
            {selectedComponent === 'modal' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Title</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm"
                    value={modalTitle}
                    onChange={e => setModalTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Content</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white border border-zinc-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 outline-none text-base shadow-sm min-h-[80px]"
                    value={modalContent}
                    onChange={e => setModalContent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2 tracking-wide">Color</label>
                  <div className="flex gap-3">
                    {MODAL_COLORS.map((c) => (
                      <button
                        key={c.value}
                        className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 shadow-sm text-white text-base focus:outline-none focus:ring-2 focus:ring-pink-500 ${modalColor === c.value ? 'border-pink-500 ring-2 ring-pink-500 scale-105' : 'border-zinc-700 hover:border-pink-400 hover:scale-105'} ${c.value}`}
                        onClick={() => setModalColor(c.value)}
                        type="button"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <label className="font-bold text-base flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={modalRounded} onChange={e => setModalRounded(e.target.checked)} className="accent-pink-500 w-5 h-5 rounded focus:ring-2 focus:ring-pink-500" />
                    Rounded
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Preview & Code */}
        <div className="flex flex-col gap-6">
          <LiveProvider code={code}>
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 shadow-xl backdrop-blur-sm min-h-[120px]">
              <span className="text-sm text-zinc-400 mb-2">Live Preview</span>
              <div className="w-full flex justify-center relative" style={{ minHeight: 180, maxHeight: 260, overflow: 'hidden', background: 'rgba(24,24,27,0.7)', borderRadius: '1rem', padding: '1rem' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <LivePreview />
                </div>
              </div>
              <LiveError className="text-red-400 text-xs mt-2" />
            </div>
          </LiveProvider>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">JSX + Tailwind Code</span>
              <button
                className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-pink-600 transition"
                onClick={copyCode}
              >
                Copy code
              </button>
            </div>
            <CodeMirror
              value={code}
              height="180px"
              theme={darkMode ? oneDark : undefined}
              extensions={[javascript()]}
              onChange={onCodeChange}
              basicSetup={{ lineNumbers: false, highlightActiveLine: false }}
              className="rounded-lg border border-zinc-800 overflow-hidden"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 text-zinc-500 text-xs">More features and components coming soon!</div>
    </div>
  );
};

export default Playground; 