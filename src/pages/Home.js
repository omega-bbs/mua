import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Select from "../ui/components/Select";

import PageLayout from "../components/PageLayout";
import BoardList from "../components/BoardList";
import TopicList from "../components/TopicList";

const Divider = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  height: 5rem;
`;

Header.Main = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  align-items: center;
`;

Header.Sidebar = styled.div`
  display: flex;
  align-items: center;
`;

Header.Title = styled.h1`
  flex: 1;
  overflow: hidden;
  margin: 0;
  font-size: 2rem;
  font-weight: 400;
  line-height: 4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

Header.Sort = styled(Select)`
  font-size: ${14 / 16}rem;
  color: rgba(0, 0, 0, 0.6);
`;

const CreateTopic = styled(NavLink)`
  display: block;
  width: 8rem;
  height: 3rem;
  margin: 1rem 0;
  border-radius: 2px;
  line-height: 3rem;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #3f51b5;
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <PageLayout>
          <PageLayout.Main>
            <Header>
              <Header.Main>
                <Header.Title>Board</Header.Title>
              </Header.Main>
              <Header.Sidebar>
                <Header.Sort>
                  <Select.Option name="Latest" value="latest" />
                  <Select.Option name="Newest" value="newest" />
                </Header.Sort>
              </Header.Sidebar>
            </Header>
          </PageLayout.Main>
          <PageLayout.Sidebar>
            <CreateTopic to="/topic/new">Create Topic</CreateTopic>
          </PageLayout.Sidebar>
        </PageLayout>
        <Divider />
        <PageLayout>
          <PageLayout.Main>
            <TopicList
              data={[
                { id: 1, title: "foo", postCount: 10 },
                { id: 2, title: "bar", postCount: 20 },
                { id: 3, title: "baz", postCount: 30 },
              ]}
            />
          </PageLayout.Main>
          <PageLayout.Sidebar>
            <BoardList
              data={[
                { id: 0, slug: "game", name: "Game" },
                { id: 1, slug: "tech", name: "Tech" },
              ]}
            />
          </PageLayout.Sidebar>
        </PageLayout>
      </div>
    );
  }
}

export default Home;
