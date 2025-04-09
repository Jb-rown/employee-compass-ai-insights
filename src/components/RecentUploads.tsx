
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

type Upload = {
  id: string;
  filename: string;
  row_count: number;
  status: string;
  created_at: string;
  [key: string]: any;
};

interface RecentUploadsProps {
  uploads: Upload[];
  isLoading: boolean;
}

const RecentUploads = ({ uploads, isLoading }: RecentUploadsProps) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (uploads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No upload history available</p>
        <Button className="mt-4" onClick={() => navigate("/upload")}>
          Upload Employee Data
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Records</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Uploaded</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploads.map((upload) => (
            <TableRow key={upload.id}>
              <TableCell className="font-medium">{upload.filename}</TableCell>
              <TableCell>{upload.row_count}</TableCell>
              <TableCell className="flex items-center">
                {getStatusIcon(upload.status)}
                <span className="ml-2 capitalize">{upload.status}</span>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(upload.created_at), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/upload")}>
          Upload More Data
        </Button>
      </div>
    </div>
  );
};

export default RecentUploads;
