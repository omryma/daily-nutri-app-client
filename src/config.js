const dev = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://api.mydailynutrition.net/dev'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_Y2hoSCNfj',
    APP_CLIENT_ID: '27cd2qb8m4oqnoje0jq1fsfp3q',
    IDENTITY_POOL_ID: 'us-east-1:567843a0-d6da-4343-ae1f-81b74ad1bcd9'
  }
}

const prod = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://api.mydailynutrition.net/dev'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_pzD7OOmmA',
    APP_CLIENT_ID: '74ps41vcmli7l4m3i3nr8gbt2e',
    IDENTITY_POOL_ID: 'us-east-1:ff8a1c52-65dd-41a7-bc4f-de9a7570f1d1'
  }
}

const config = process.env.REACT_APP_STAGE === 'dev' ? dev : prod;

export default {
  social: { FB: '589920791875534' },
  ...config
}
