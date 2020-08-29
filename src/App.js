import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  DarkMode,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spinner,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";
import theme from "@chakra-ui/theme";

function App() {
  const [behavior, setBehavior] = React.useState("chakra-default");

  const onUpdate = React.useCallback(() => {
    if (behavior === "hacky-workaround") {
      window.dispatchEvent(new Event("resize"));
    } else {
      // By default, do nothing, to demonstrate Chakra's default behavior.
    }
  }, [behavior]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <DarkMode>
        <div className="App">
          <header className="App-header">
            <Popover placement="top">
              <PopoverTrigger>
                <Button variant="unstyled" height="auto">
                  <img src={logo} className="App-logo" alt="logo" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <DemoPopoverContent onUpdate={onUpdate} />
              </PopoverContent>
            </Popover>
            <p>Click on the spinning React logo to see a popover.</p>
            <Box display="flex" alignItems="center" marginTop="4">
              Behavior:
              <Select
                size="sm"
                marginLeft="2"
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
              >
                <option value="chakra-default">
                  Chakra default (no update)
                </option>
                <option value="hacky-workaround">
                  Hacky workaround (resize on update)
                </option>
              </Select>
            </Box>
          </header>
        </div>
      </DarkMode>
    </ChakraProvider>
  );
}

function DemoPopoverContent({ onUpdate }) {
  const [isEditable, setIsEditable] = React.useState(false);

  return (
    <>
      <PopoverHeader position="relative">
        React{" "}
        <Box as="label" position="absolute" left="2" top="2">
          <Switch
            size="sm"
            isChecked={isEditable}
            onChange={(e) => {
              setIsEditable(e.target.checked);
              onUpdate();
            }}
          />{" "}
          <EditIcon boxSize="1em" aria-label="Edit" />
        </Box>
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        {isEditable ? (
          <DemoPopoverEditForm onUpdate={onUpdate} />
        ) : (
          <>React is a Javascript framework! This is its logo.</>
        )}
      </PopoverBody>
    </>
  );
}

function DemoPopoverEditForm({ onUpdate }) {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading data from the server for the edit form
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      onUpdate();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [setIsLoading, onUpdate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack spacing="2" alignItems="stretch">
      <FormControl>
        <FormLabel fontSize="sm">Name</FormLabel>
        <Input size="sm" value="React" />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="sm">Description</FormLabel>
        <Textarea size="sm">
          React is a Javascript framework! This is its logo.
        </Textarea>
      </FormControl>
      <Box display="flex" justifyContent="flex-end">
        <Button colorScheme="green" size="sm">
          Save changes
        </Button>
      </Box>
    </VStack>
  );
}

export default App;
