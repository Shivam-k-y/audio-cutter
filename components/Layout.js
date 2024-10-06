import { AppShell, Header, Title, Center } from '@mantine/core';

export default function Layout({ children }) {
    return (
        <AppShell
            padding="md"
            header={
                <Header height={60} padding="xs">
                    <Center>
                        <Title order={3}>Audio Cutter</Title>
                    </Center>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}
