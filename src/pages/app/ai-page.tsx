import { aiApi } from '@/api';
import { PlaceholdersAndVanishInput } from '@/components/acernity/placeholders-and-vanish-input';
import { Flex } from '@/components/layout';
import { Loading } from '@/components/layout/loading';
import Typography from '@/components/typography';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Markdown from '@/lib/markdown';
import { BotMessageSquare, Circle, PcCase, User } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';

export const AiPage = () => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([
    {
      role: 'SYSTEM',
      message: '**Olá!** Seja bem vindo a nossa área de inteligencia artifical!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const placeholders = [
    'Como anda o estado atual das maquinas?',
    'Qual suas diretivas?',
    'Faça um relatorio sobre as maquinas.'
  ];
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userMessage: Message = {
      message: message,
      role: 'USER'
    };
    setLoading(true);
    setHistory((prev) => [...prev, userMessage]);
    const aiResponse = await aiApi.aiPost({ message });

    const aiMessage: Message = {
      role: 'CHATBOT',
      message: aiResponse.data.response
    };
    setLoading(false);
    setHistory((prev) => [...prev, aiMessage]);
  }
  return (
    <Flex className="mx-auto w-full max-w-6xl flex-1 overflow-auto p-4 text-sm" vertical>
      <Flex align="center" className="mb-4 gap-4">
        <Circle size={6} strokeWidth={4} className="text-black" />
        <Typography.Title level={4} className="flex items-center justify-between gap-4">
          Chat bot - AI
        </Typography.Title>
      </Flex>
      <div className={`w-full flex-1 overflow-y-auto ${history.length == 1 ? 'flex items-center justify-center' : ''}`}>
        {history.map((msg) => renderMessage(msg))}
        {loading && <Loading className="h-16" />}
      </div>
      <Flex className="w-full overflow-x-hidden pb-4" vertical>
        <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />

        {/* <Flex>
          <Button size="icon" variant="outline"></Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
          ></Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
          ></Button>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

type Message = {
  role: string;
  message: string;
};

function renderMessage(message: Message) {
  if (message.role == 'USER')
    return (
      <Flex align="start" justify="end" className="mb-4">
        <div className="mt-1 flex w-3/4 justify-end px-2 shadow-none">
          <div className="w-max rounded-xl bg-neutral-100 p-3 dark:bg-neutral-900">{message.message}</div>
        </div>
        <Avatar>
          <AvatarFallback>
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      </Flex>
    );

  return (
    <Flex className="mb-4">
      <Avatar>
        <AvatarFallback>
          {message.role == 'SYSTEM' ? <PcCase size={18} /> : <BotMessageSquare size={18} />}
        </AvatarFallback>
      </Avatar>
      <div className="w-full justify-start">
        <div className="size-full rounded-xl px-4">
          <Markdown>{message.message}</Markdown>
        </div>
      </div>
    </Flex>
  );
}
