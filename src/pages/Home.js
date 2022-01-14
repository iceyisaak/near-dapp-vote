import React from 'react';

const Home = ({ login }) => {

  return (
    <main>
      <h1>NEAR Dapp Poll</h1>
      <p>
        Set up the poll and let the public vote :))
      </p>
      <ol>
        <li>Set up the poll</li>
        <li>Share the link</li>
        <li>Cast your vote</li>
      </ol>
      <p>
        Go ahead and click the button below to try it out:
      </p>
      <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
        <button onClick={login}>Vote Now</button>
      </p>
    </main>
  );
};

export default Home;
