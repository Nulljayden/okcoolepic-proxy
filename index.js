async function importIndexModule() {
  try {
    await import('./index.mjs');
    console.log('Index module loaded successfully.');
  } catch (error) {
    console.error('Error importing index module:', error);
  }
}

importIndexModule();
