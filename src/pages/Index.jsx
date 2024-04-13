import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Divider, useToast } from "@chakra-ui/react";

const Index = () => {
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [searchIdNumber, setSearchIdNumber] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lostIds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idNumber, name }),
      });
      if (response.ok) {
        setIdNumber("");
        setName("");
        toast({
          title: "ID Uploaded",
          description: "The lost ID has been uploaded successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload the lost ID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading lost ID:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/lostIds/${searchIdNumber}`);
      const data = await response.json();
      setSearchResult(data.name);
    } catch (error) {
      console.error("Error searching for ID:", error);
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Lost ID Recovery
      </Heading>

      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h2" size="lg" marginBottom={4}>
            Upload Lost ID
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input placeholder="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Button type="submit" colorScheme="blue">
                Upload
              </Button>
            </VStack>
          </form>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" marginBottom={4}>
            Search Lost ID
          </Heading>
          <HStack spacing={4}>
            <Input placeholder="ID Number" value={searchIdNumber} onChange={(e) => setSearchIdNumber(e.target.value)} />
            <Button onClick={handleSearch} colorScheme="blue">
              Search
            </Button>
          </HStack>
          {searchResult && (
            <Text marginTop={4}>
              Name: <strong>{searchResult}</strong>
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
