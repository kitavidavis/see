import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Group,
  Menu,
  Button,
  UnstyledButton,
  Divider,
  Grid,
  Card,
  List,
  Box,
  ScrollArea,
  InputWrapper,
  Select,
  useMantineColorScheme,
  Table,
} from '@mantine/core';
import { useColorScheme, useScrollLock, useViewportSize } from '@mantine/hooks';
import { SwitchToggle } from './ToggleTheme';
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search } from 'tabler-icons-react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from "leaflet"
import Schools from './schools';
import Image1 from "./image1.jpeg";
import Image2 from "./image2.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const accessToken = 'pk.eyJ1IjoiZGF2aXNraXRhdmkiLCJhIjoiY2w0c2x2NjNwMGRvbDNrbGFqYW9na2NtaSJ9.q5rs7WMJE8oaBQdO4zEAcg';

export default function Dashboard() {
  const theme = useMantineTheme();
  const theme2 = useMantineColorScheme();
  const preferredColorscheme = useColorScheme();
  const [themescheme, setThemeScheme] = useState('dark');
  const [opened, setOpened] = useState(false);
  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock(true);
  const [county, setCounty] = useState('');
  const [mopened, setMOpened] = useState(false);
  const [unit, setUnit] = useState('');
  const [feature, setFeature] = useState<any>(null);
  const Map = ReactMapboxGl({
    accessToken: accessToken
  });

  useEffect(() => {
    setThemeScheme(preferredColorscheme);
  }, [preferredColorscheme]);


  const fillBlueOptions = { fillColor: 'orange', color: 'orange', opacity: 1, fillOpacity: 1 }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={70} p="md">
          <Group position='apart'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Title order={3}>SEE Learning </Title>
          </div>

        <SwitchToggle />
        
          </Group>
        </Header>
      }
    >

      <>
      <MediaQuery smallerThan={'lg'} styles={{display: 'none'}}>
      <Grid gutter='xs' columns={24}>
        <Grid.Col span={6}>
          <Card style={{height: height - 100}} shadow='sm' p={'md'}>
            <Group direction='column'>
              <div>
                <Title style={{color: 'orange'}} order={5}>Introduction</Title>
                <Text size='sm'>The purpose of this study is to determine whether it is feasible to implement  the Social Emotional, and Ethical (SEE) Learning, a Social Emotional Learning (SEL) program in diverse cultural settings worldwide. This study will assess cultural context, adaptation needs, pedagogical orientation, and/or instructional orientation that hinder or strengthen SEE Learning™ implementation in different schools around the world.
                </Text>
              </div>

              <div>
              <Title mb="md" style={{color: 'orange'}} order={5}>Gallery</Title>
              <Carousel>
              <img height={(height - 150) * 0.4} width={'100%'} src={Image1} />
              <img height={(height - 150) * 0.4} width={'100%'} src={Image2} />
            </Carousel>
              </div>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
        <Card style={{height: height - 100}} shadow='sm'>
        <MapContainer center={[-1.234,36.754]} style={{height: '100%', width: '100%'}} zoom={10}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url={ theme2.colorScheme === "dark" ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
  />
  {Schools.features.map((item: any, index: any) => {
    return (
      <CircleMarker  eventHandlers={{ click: function(){setFeature(item)} }} key={index} center={[item.properties.Latitude, item.properties.Longitude]} pathOptions={fillBlueOptions} radius={14} />
    )
  })}
</MapContainer>
            </Card>
        </Grid.Col>
        <Grid.Col span={6}>
        <Card style={{height: height - 100}} shadow='sm' p={'md'}>
    <Box
      sx={(theme) => ({
        height: '100%',
        marginBottom: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
        },
      })}
    >
      <Title style={{color: 'orange'}} order={5}> Summary Info</Title>
      {feature !== null ? (
        <>
        <Text mt="md" size='sm'>School ID: <strong>{feature.properties.No}</strong></Text>
        <Text mt="md" size='sm'>School: <strong>{feature.properties.School}</strong></Text>
        <Text mt="md" size='sm'>Type: <strong>{feature.properties.Type}</strong></Text>
        <Text mt="md" size='sm'>Year Started: <strong>{feature.properties.Year_Started}</strong></Text>
        <Text mt="md" size='sm'>Students: <strong>{feature.properties.Students}</strong></Text>
        <Text mt="md" size='sm'>Staff: <strong>{feature.properties.Staff}</strong></Text>
        <Text mt="md" size='sm'>Staff Per Student: <strong>{feature.properties.Staff_per_student}</strong></Text>
        </>
      ) : (
        <Text size='sm'><strong>Click on a school layer to see properties.</strong></Text>
      )}
    </Box>
        </Card>
        </Grid.Col>
      </Grid>
      </MediaQuery>

      <MediaQuery largerThan={'md'} styles={{display: 'none'}}>
      <Card style={{height: height - 100}} shadow='sm'>
        <MapContainer center={[-1.234,36.754]} style={{height: '100%', width: '100%'}} zoom={10}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url={ theme2.colorScheme === "dark" ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
  />
  {Schools.features.map((item: any, index: any) => {
    return (
      <CircleMarker  eventHandlers={{ click: function(){setFeature(item)} }} key={index} center={[item.properties.Latitude, item.properties.Longitude]} pathOptions={fillBlueOptions} radius={14}>
        <Popup>
          <Table>
            <tbody>
              <tr>
                <td><strong>School Id</strong></td>
                <td>{item.properties.No}</td>
              </tr>
              <tr>
                <td><strong>School</strong></td>
                <td>{item.properties.School}</td>
              </tr>
              <tr>
                <td><strong>Type</strong></td>
                <td>{item.properties.Type}</td>
              </tr>
              <tr>
                <td><strong>Year Started</strong></td>
                <td>{item.properties.Year_Started}</td>
              </tr>
              <tr>
                <td><strong>Students</strong></td>
                <td>{item.properties.Students}</td>
              </tr>
              <tr>
                <td><strong>Staff</strong></td>
                <td>{item.properties.Staff}</td>
              </tr>
              <tr>
                <td><strong>Staff per Student</strong></td>
                <td>{item.properties.Staff_per_student}</td>
              </tr>
            </tbody>
          </Table>
        </Popup>
      </CircleMarker>
    )
  })}
</MapContainer>
            </Card>
      </MediaQuery>
      </>
      
    </AppShell>
  );
}
