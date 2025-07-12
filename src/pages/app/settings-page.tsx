import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/molecules/tabs';

const GeneralSettings = () => (
  <div>
    <h2 className="mb-2 text-xl font-semibold">Configurações Gerais</h2>
    <p>Ajuste as configurações gerais do sistema.</p>
  </div>
);

const ReportSettings = () => (
  <div>
    <h2 className="mb-2 text-xl font-semibold">Configurações de Relatórios</h2>
    <p>Configure os relatórios do sistema.</p>
  </div>
);

const UserManagement = () => (
  <div>
    <h2 className="mb-2 text-xl font-semibold">Gerenciamento de Usuários</h2>
    <p>Gerencie os usuários do sistema.</p>
  </div>
);

export const SettingsPage = () => {
  const isAdmin = true; // Substitua pela lógica real de autenticação

  if (!isAdmin) {
    return <div className="p-6">Acesso negado. Esta página é apenas para administradores.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Configurações</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="reports">
          <ReportSettings />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
