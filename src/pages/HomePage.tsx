import * as React from "react";
import {
  Box,
  Text,
  Grid,
  Center,
} from "@chakra-ui/react";

export const HomePage = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
      <Center>
        <Text>
          This is HOME page
        </Text>
      </Center>
    </Grid>
  </Box>
);
