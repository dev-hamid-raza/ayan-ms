import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft, Home } from "lucide-react";
import { ROUTES } from "@/CONSTANTS/ROUTES";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 rounded-full blur-lg opacity-75"></div>
            <div className="relative bg-linear-to-br from-red-500 to-orange-500 p-6 rounded-full">
              <Lock className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-white mb-2">403</h1>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4">Access Forbidden</h2>

        {/* Description */}
        <p className="text-slate-400 text-lg mb-2">
          You don't have permission to access this resource.
        </p>
        <p className="text-slate-500 mb-8">
          This might be because you don't have the required permissions or your access level is insufficient.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-slate-700 hover:bg-slate-800 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate(`/${ROUTES.DASHBOARD}`)}
            className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Welcome
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-500 text-sm">
            If you believe this is a mistake, please contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
