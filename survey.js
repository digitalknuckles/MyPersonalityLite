import React, { useState } from 'react';
import { ethers } from 'ethers';

const questions = [
  {
    question: 'How do you typically approach new experiences and ideas?',
    options: [
      { text: 'With enthusiasm and excitement', value: 'E' },
      { text: 'With careful consideration and analysis', value: 'I' },
      { text: 'With a desire for spontaneity and fun', value: 'P' },
      { text: 'With a focus on practicality and efficiency', value: 'J' },
    ]
  },
  {
    question: 'How do you prefer to organize your tasks and responsibilities?',
    options: [
      { text: 'I prefer to have a clear plan and structure', value: 'J' },
      { text: 'I tend to be flexible and adapt to changing situations', value: 'P' },
      { text: 'I like to keep things open-ended and go with the flow', value: 'P' },
      { text: 'I rely on my instincts and intuition to guide me', value: 'N' },
    ]
  },
  {
    question: 'How would you describe your social interactions?',
    options: [
      { text: 'I enjoy being the center of attention and meeting new people', value: 'E' },
      { text: 'I value close relationships and prefer smaller gatherings', value: 'I' },
      { text: 'I thrive in social settings and love engaging with others', value: 'E' },
      { text: 'I\'m more reserved and prefer one-on-one conversations', value: 'I' },
    ]
  },
  {
    question: 'How do you handle stress and pressure?',
    options: [
      { text: 'I tackle problems head-on and work towards solutions', value: 'T' },
      { text: 'I maintain a calm demeanor and prioritize self-care', value: 'F' },
      { text: 'I seek support from friends and loved ones', value: 'F' },
      { text: 'I focus on finding practical solutions and staying organized', value: 'J' },
    ]
  },
  {
    question: 'What motivates you in your career or personal pursuits?',
    options: [
      { text: 'I strive for innovation and making a positive impact', value: 'N' },
      { text: 'I value stability and achieving tangible results', value: 'S' },
      { text: 'I enjoy collaborating with others and building relationships', value: 'F' },
      { text: 'I pursue excellence and enjoy tackling challenges', value: 'T' },
    ]
  },
  {
    question: 'How do you approach decision-making?',
    options: [
      { text: 'I trust my intuition and follow my heart', value: 'F' },
      { text: 'I gather information and weigh the pros and cons', value: 'T' },
      { text: 'I seek advice from others and consider different perspectives', value: 'F' },
      { text: 'I rely on logic and rationality to guide my choices', value: 'T' },
    ]
  },
  {
    question: 'What role do you typically play in group settings or projects?',
    options: [
      { text: 'The initiator and idea generator', value: 'N' },
      { text: 'The organizer and planner', value: 'J' },
      { text: 'The collaborator and team player', value: 'F' },
      { text: 'The strategist and problem solver', value: 'T' },
    ]
  },
  {
    question: 'How do you prefer to communicate your thoughts and ideas?',
    options: [
      { text: 'I\'m expressive and enjoy sharing stories and experiences', value: 'E' },
      { text: 'I\'m direct and to the point, focusing on facts and details', value: 'S' },
      { text: 'I\'m empathetic and strive to connect with others emotionally', value: 'F' },
      { text: 'I\'m analytical and prefer logical reasoning and arguments', value: 'T' },
    ]
  },
  {
    question: 'What values are most important to you in your personal and professional life?',
    options: [
      { text: 'Creativity, freedom, and authenticity', value: 'N' },
      { text: 'Discipline, integrity, and responsibility', value: 'J' },
      { text: 'Compassion, harmony, and cooperation', value: 'F' },
      { text: 'Knowledge, competence, and independence', value: 'T' },
    ]
  },
  {
    question: 'How do you typically respond to conflicts or disagreements?',
    options: [
      { text: 'I seek resolution through compromise and understanding', value: 'F' },
      { text: 'I stand my ground and defend my beliefs', value: 'T' },
      { text: 'I avoid confrontation and strive for peace', value: 'F' },
      { text: 'I analyze the situation and find a practical solution', value: 'T' },
    ]
  },
];

const mbtiMap = {
  INFP: 'ipfs://bafkreidouwoq443wdijffua2r77rgkryzizl5zlyyxxfiykkz4tdb3y2zq',
  ESTJ: 'ipfs://bafkreihoxbvvmwzete7d4hpfbsxwrwk66votcjezhcycn6wlknwj4mx6ra',
  ENFP: 'ipfs://bafkreibf3sdifhgnk554k73qmdk547bk7b56ht2lypu33pqdzdx2yltbm4',
  ISTJ: 'ipfs://bafkreieeda4noiqfhsivkrwrnvsav3mw5gnmhjauvy76bc6uxflyxxwfua',
  ESFP: 'ipfs://bafkreiarx3vbfgx3io2x44qmmtooz5yc3lcgwuuu2y5tgurkjqt6n6es6m',
  ENTJ: 'ipfs://bafkreidq2unj7dn552ku4guxxadxt72yaur6ibc5zuqyrijxnx5yelwrxy',
  ENFJ: 'ipfs://bafkreic6nluli7zdrlumi47fjko2nocwxgprxgrpiwnexkfz4wfdicndum',
  INTP: 'ipfs://bafkreiai6cret5grdblwlgzw2lzinkthz2qkfb3ie27hbwnyaqhkatxz4e',
  ISFJ: 'ipfs://bafkreihq5hgg2dzzd4c4pnngzmlyk2qfkis5ww5on3mds7jsxtyaw7khx4',
  INFJ: 'ipfs://bafkreifgtnhf23wyxkd6axt5mjo7b6s2mvvqle2bq6za4x7dacomoullpe',
  ESTP: 'ipfs://bafkreigucauyhk42y2gqu425tesywrxk2mdvkyn623jy5xghsthuq7p2d4',
  ISFP: 'ipfs://bafkreiesmw5seaeh3btvgf676bgk7lpif6gzelaky4pml2ydimdhkdqe5i',
  INTJ: 'ipfs://bafkreigbt436bbtfuqtihdc6wiouudssfauaajosrzfjygshmsm5jkeple',
  ESFJ: 'ipfs://bafkreialj2pi4dwdipwgdp5ufyva4w5q6ov4rykimaiyrmnf4i47h5x224',
  ENTP: 'ipfs://bafkreie5fvoyyk5dwc2ppkeaquieomxeckbdd23o3iqkdtg7a6yuzzttim',
  ISTP: 'ipfs://bafkreiddtzunxcbcp6iotwop7nmiyizfqmrfoif5dfdmpvs72b3iupoihu'
};

function getMBTI(score) {
  return `${score.I > score.E ? 'I' : 'E'}${score.N > score.S ? 'N' : 'S'}${score.F > score.T ? 'F' : 'T'}${score.P > score.J ? 'P' : 'J'}`;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [mbtiType, setMbtiType] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const handleAnswer = (value) => {
    const updatedScore = { ...score, [value]: score[value] + 1 };
    if (current === questions.length - 1) {
      const type = getMBTI(updatedScore);
      setMbtiType(type);
    } else {
      setCurrent(current + 1);
      setScore(updatedScore);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletConnected(accounts.length > 0);
    }
  };

  const mintNFT = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract('YOUR_CONTRACT_ADDRESS', ['function mintNFT(address to, string memory uri)'], signer);
    const cid = mbtiMap[mbtiType];
    await contract.mintNFT(await signer.getAddress(), cid);
  };

  if (mbtiType) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Your Personality Type: {mbtiType}</h1>
        <img src={`https://ipfs.io/ipfs/${mbtiMap[mbtiType].split('ipfs://')[1]}`} alt={mbtiType} className="mx-auto my-4 w-64" />
        {walletConnected ? (
          <button onClick={mintNFT} className="bg-green-600 text-white px-4 py-2 rounded">Mint Personality NFT</button>
        ) : (
          <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded">Connect Wallet</button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
      <div className="space-y-2">
        {questions[current].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.value)}
            className="block w-full bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded text-left shadow"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
