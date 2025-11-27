import { SchemaBuilder } from "@/components/builder";
import { MainLayout } from "@/components/layout/MainLayout";
import { PreviewDrawer } from "@/components/preview";
import { Sidebar } from "@/components/sidebar";

function App() {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-12rem)] flex gap-4">
        {/* Sidebar - Schemas & Templates */}
        <div className="hidden md:block flex-shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Main Content - Builder */}
        <div className="flex-1 min-w-0">
          <SchemaBuilder />
        </div>

        {/* Preview Drawer - Opens from right side */}
        <PreviewDrawer />
      </div>
    </MainLayout>
  );
}

export default App;
