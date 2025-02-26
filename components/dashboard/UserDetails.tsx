import { User } from '@/types/user';

interface UserDetailsProps {
  user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Name:</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Phone:</p>
          <p className="font-medium">{user.phone || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
}
