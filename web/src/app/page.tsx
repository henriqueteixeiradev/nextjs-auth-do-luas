import Link from "next/link";

import { withAuthentiaction } from "../withAuthentication";

interface Props {
  session: any;
}

const Home = (props: Props) => {
  const { session } = props;

  return (
    <div>
      <span>.home</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <Link href="/auth/logout">Deslogar</Link>
    </div>
  );
};

export default withAuthentiaction(Home);
