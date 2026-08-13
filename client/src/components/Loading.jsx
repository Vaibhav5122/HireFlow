import { Loader, LoaderPinwheelIcon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderPinwheelIcon width={"30"} height={"30"} className="animate-spin" />
    </div>
  );
};
export const LoadingBig = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader width={"40"} height={"40"} className="animate-spin" />
    </div>
  );
};
