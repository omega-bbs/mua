import React from 'react'
import styled from 'styled-components'

import AppHeader from '../components/AppHeader'
import PageLayout from '../components/PageLayout'

const Divider = styled.div`border-top: 1px solid rgba(0, 0, 0, 0.1);`

const CreateTopic = styled.button`
  display: block;
  box-sizing: border-box;
  width: 8rem;
  height: 3rem;
  margin: 1rem 0;
  border: none;
  font: inherit;
  color: #fff;
  background: none;
  background-color: #3f51b5;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5rem;
`

Header.Left = styled.div`
  display: flex;
  align-items: center;
`

Header.Right = styled.div`
  display: flex;
  align-items: center;
`

Header.Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
`

Header.Sort = styled.select`
  height: 2em;
  border: none;
  font: inherit;
  font-size: 0.875em;
  color: rgba(0, 0, 0, 0.6);
  background: none;
`

class Home extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <PageLayout>
          <PageLayout.Main>
            <Header>
              <Header.Left>
                <Header.Title>Board</Header.Title>
              </Header.Left>
              <Header.Right>
                <Header.Sort>
                  <option>Latest</option>
                </Header.Sort>
              </Header.Right>
            </Header>
          </PageLayout.Main>
          <PageLayout.Sidebar>
            <CreateTopic>Create Topic</CreateTopic>
          </PageLayout.Sidebar>
        </PageLayout>
        <Divider />
        <PageLayout>
          <PageLayout.Main />
          <PageLayout.Sidebar />
        </PageLayout>
      </div>
    )
  }
}

export default Home
