import QueryProvider from "./providers/QueryProvider";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}