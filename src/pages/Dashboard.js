import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

import { MdHowToVote } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';

const Dashboard = ({ changeCandidates }) => {

  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
      console.log(
        await window.contract.didParticipate({
          prompt: localStorage.getItem("prompt"),
          user: window.accountId
        }));
    };
    getPrompts();
  }, []);


  return (
    <main>
      <div className='header'>
        <h1>
          Available Polls
          {' '}
          <Button variant='secondary' href='/newPoll' >
            +
          </Button>
        </h1>
      </div>
      <Container>
        <Table
          striped
          bordered
          hover
          variant='dark'
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Poll Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {promptList.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el}</td>
                  <td>
                    <MdHowToVote
                      onClick={() => changeCandidates(el)}
                      className='icon-btn'
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default Dashboard;
