import { useAuth } from '../auth'; // Corrected import
import { Navigate } from 'react-router-dom';

type ProtectedProps = {
  children: React.ReactNode;
};

const Protected = (props: ProtectedProps) => {
  const { children } = props;
  const { user } = useAuth() as { user: any }; /* eslint-disable-line */
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
