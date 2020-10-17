import React, {useEffect, useState} from 'react';
import Root from './Root';
import RNBootSplash from 'react-native-bootsplash';
import {
  AccesRestreintContext,
  GrandPublicContext,
  TablesSchemaContext,
} from './Contexts';

function App() {
  const [tablesSchema, setTablesSchema] = useState(null);
  const [sitesGrandPublic, setSitesGrandPublic] = useState(null);
  const [sitesAccesRestreint, setSitesAccesRestreint] = useState(null);

  let csvJSON = (csv: string) => {
    var lines = csv.split('\n');

    var result = [];

    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return JSON.stringify(result);
  };

  let init = async () => {
    fetch('https://www.data.gouv.fr/api/1/datasets/5eb2c639949dda18c97e9677/')
      .then((response) => response.json())
      .then((json) => {
        let promises: Promise<void>[] = [];
        json.resources.forEach((resource: any) => {
          if (resource && resource.latest) {
            promises.push(
              fetch(resource.latest)
                .then((response) => {
                  if (response.status === 200) {
                    response.text().then((fileText) => {
                      let data: any = {};
                      if (resource.mime === 'application/json') {
                        data = JSON.parse(fileText);
                      } else if (resource.mime === 'text/csv') {
                        data = JSON.parse(csvJSON(fileText));
                      }
                      if (data) {
                        switch (resource.title) {
                          case 'tableschema.json':
                            setTablesSchema(data);
                            break;
                          case 'sites-prelevements-grand-public.csv':
                            setSitesGrandPublic(data);
                            break;
                          case 'sites-prelevements-acces-restreint.csv':
                            setSitesAccesRestreint(data);
                            break;
                          default:
                            break;
                        }
                      }
                    });
                  }
                })
                .catch((error) => {
                  console.error(error);
                }),
            );
          }
        });
        return Promise.all(promises);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);

  return (
    <TablesSchemaContext.Provider value={tablesSchema}>
      <GrandPublicContext.Provider value={sitesGrandPublic}>
        <AccesRestreintContext.Provider value={sitesAccesRestreint}>
          <Root />
        </AccesRestreintContext.Provider>
      </GrandPublicContext.Provider>
    </TablesSchemaContext.Provider>
  );
}

export default App;
