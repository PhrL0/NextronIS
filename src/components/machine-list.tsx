import { Button, Form, Input, InputNumber, message, Modal, Table } from 'antd';
import { useState } from 'react';

function MachineList({ machines, setMachines }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);

  const [form] = Form.useForm();

  const showModal = (machine) => {
    setEditingMachine(machine);
    if (machine) {
      form.setFieldsValue(machine);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingMachine) {
        // Atualização da máquina
        const updatedMachines = machines.map((m) => (m.id === editingMachine.id ? { ...m, ...values } : m));
        setMachines(updatedMachines);
        message.success('Máquina atualizada!');
      } else {
        // Criação de nova máquina
        const newMachine = { id: Date.now(), ...values };
        setMachines([...machines, newMachine]);
        message.success('Máquina criada!');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (machineId) => {
    Modal.confirm({
      title: 'Confirma a exclusão?',
      onOk: () => {
        setMachines(machines.filter((m) => m.id !== machineId));
        message.success('Máquina excluída!');
      }
    });
  };

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Temperatura', dataIndex: 'temperature', key: 'temperature' },
    { title: 'Vibração', dataIndex: 'vibration', key: 'vibration' },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Editar
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Excluir
          </Button>
        </>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => showModal(null)}>
        Nova Máquina
      </Button>
      <Table dataSource={machines} columns={columns} rowKey="id" />

      <Modal
        title={editingMachine ? 'Editar Máquina' : 'Nova Máquina'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Informe o nome da máquina' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="temperature"
            label="Temperatura"
            rules={[{ required: true, message: 'Informe a temperatura' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="vibration" label="Vibração" rules={[{ required: true, message: 'Informe a vibração' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MachineList;
