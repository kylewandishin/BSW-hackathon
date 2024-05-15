import { Navigate } from 'react-router-dom';
import { UserAuth } from '../auth';

type ProtectedProps = {
  children: React.ReactNode;
};

const Protected = (props: ProtectedProps) => {
  const { children } = props;
  /* eslint-disable-next-line */
  const { user } = UserAuth() as { user: any };
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
